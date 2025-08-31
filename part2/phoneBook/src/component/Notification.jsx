import '../index.css'
const Notification = ({ message, error, success }) => {

  return (
    <div>
      {success && <div className='success'>
        {message}
      </div>}
      {error && <div className='error'>
        {message}
      </div>}
    </div>
  )
}

export default Notification