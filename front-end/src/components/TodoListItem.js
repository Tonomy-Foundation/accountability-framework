import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


class TodoListItem extends React.Component {
  render() {
    const buttonStyle={
      // textAlign: 'left', // not working :(
      flex: 1,
      flexDirection: "row",
    }

    const iconStyle = {
      fill: "grey",
      paddingRight: "8px"
    }

    return (
        <Box display="flex" justifyContent="flex-start">
          <Button style={buttonStyle} onClick={this.props.onClick}>
            {this.props.checked
              ? <CheckCircleOutlineIcon style={iconStyle}/>
              : <RadioButtonUncheckedIcon style={iconStyle}/>
            }
            {this.props.name}
          </Button>
        </Box>
    );
  }
}

export default TodoListItem;