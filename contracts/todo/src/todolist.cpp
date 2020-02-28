#include <todolist.hpp>

ACTION todolist::createitem(name from, string item) {
  require_auth(from);

  todo_table _todolist(get_self(), from.value);

  if (_todolist.begin() == _todolist.end()) {
    scopes_table _scopes(get_self(), get_self().value);
    _scopes.emplace(from, [&](auto& row) {
      row.user = from;
    });
  }

  _todolist.emplace(from, [&](auto& row) {
    row.id = _todolist.available_primary_key();
    row.todo = item;
    row.completed = false;
  });
}


ACTION todolist::toggledone(name from, uint32_t id) {
  todo_table _todolist(get_self(), from.value);

  auto itr = _todolist.find(id);

  if(itr != _todolist.end()) {
    _todolist.modify(itr, from, [&](auto& row) {
      row.completed = !row.completed;
    });
  } else {
    check(false, "Item with id not found");
  }
}

ACTION todolist::clear() {
  require_auth(get_self());
  
  scopes_table _scopes(get_self(), get_self().value);

  auto scopes_itr = _scopes.begin();
  while (scopes_itr != _scopes.end()) {
    todo_table _todolist(get_self(), (scopes_itr->user).value);

    auto todolist_itr = _todolist.begin();
    while (todolist_itr != _todolist.end()) {
      todolist_itr = _todolist.erase(todolist_itr);
    }

    scopes_itr = _scopes.erase(scopes_itr);
  }
}