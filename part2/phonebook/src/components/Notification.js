const Notification = ({ name,err }) => {
    const style = err ? 'err': "notification"
  if (name === null) {
    return;
  }

  return <p className={style}>{name}</p>;
};

export default Notification;
