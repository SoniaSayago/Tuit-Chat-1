function Form(props) {
  return (
    <form onSubmit={props.connect}>
      <label>Username</label>
      <input
        placeholder="username"
        type="text"
        required
        value={props.username}
        onChange={props.onChange}
      />
      <input type="submit" value="Connect" />
    </form>
  );
}

export default Form;
