
const LoginForm = () => {
  const handelSubmit = (e) => {
    e.target.preventDefault()
  }
  return (
    <div>
      <form onSubmit={handelSubmit} ></form>
        <div>
          username<input type="text" />
        </div>
        <div>
          password<input type="password" />   
        </div>
      <button>login</button>
    </div>
  )
}

export default LoginForm

