const Input = ({title, value, onChange}) => {
    return (
        <>
        {title}:
        <input value={value} onChange={onChange} />
        </>
    )
}

export default Input