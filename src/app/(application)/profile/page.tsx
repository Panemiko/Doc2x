import './style.css'

export default async function Page() {
    return <div className='body'>
        <form>
            <label htmlFor='nome'>Nome de usuário:</label>
            <input className='box' type="text" name='nome' id='nome' placeholder='Usuário'></input>
            <label htmlFor="email">Email:</label>
            <input className='box' type="email" name="email" id="email" placeholder='Email'></input>
            <label htmlFor='id'>Id google:</label>
            <input className='box' type='text' name='id' id='id' placeholder='id'></input>
        </form>
    </div>
}

