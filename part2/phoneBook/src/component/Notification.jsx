const Notification = ({ message }) => {

  return (
    <div>
      {message.length > 0 && (<div className='message' 
          style={{
              color: 'green',
              background: 'lightgrey',
              fontSize: '20px',
              borderStyle: 'solid',
              borderRadius: '5px',
              padding: '10px',
              marginBottom: '10px'
          }}  
      >
        {message}
      </div>)}
    </div>

  )
}

export default Notification