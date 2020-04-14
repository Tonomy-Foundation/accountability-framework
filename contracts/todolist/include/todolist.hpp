#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

CONTRACT todolist : public contract {
  public:
    using contract::contract;

    /* Adds a new item to the user's todo list
     *
     * @param from - the users account name
     * @param item - the item to add to the list
     */
    ACTION createitem(name from, string item);

    /* Toggles a todo item done/not done
     *
     * @param from - the users account name
     * @param item - the todo item's id
     */
    ACTION toggledone(name from, uint32_t id);
    ACTION clear();

  private:
    TABLE todo {
      uint32_t id;
      string   todo;
      bool     completed;
      auto primary_key() const { return id; }
    };
    typedef multi_index<name("todo"), todo> todo_table;

    TABLE scopes {
      name user;
      auto primary_key() const { return user.value; }
    };
    typedef multi_index<name("scopes"), scopes> scopes_table;
};