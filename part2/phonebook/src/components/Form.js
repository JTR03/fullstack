import Input from "./Input"

const Form = ({onSubmit, newName, number, handleNewName, handleNumber}) => {
  return (
    <>
    <form onSubmit={onSubmit}>
        <Input value={newName} onChange={handleNewName} title={"Name"} />
        <Input value={number} onChange={handleNumber} title="Number" />
        <button type="submit">add</button>
    </form>
    </>
  )
}

export default Form