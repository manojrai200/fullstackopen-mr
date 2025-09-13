const Notification = ({ status, message }) => {
  if (status === 'success') {
    return <div className="success">{message}</div>
  }else if (status === 'error') {
    return <div className="error">{message}</div>
  }else {
    return null
  }

}

export default Notification