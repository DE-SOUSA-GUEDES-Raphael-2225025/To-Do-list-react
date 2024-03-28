function MyButton(props) {
    return (  
      <input onClick={props.onClick} type="button" value={props.name}></input>
    );
  }

export default MyButton;
