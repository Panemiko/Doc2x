import { Label } from '@/components/ui/label'
import './style.css'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

export default async function Page() {
    return <div className='body'>
        <form>
            <div>
                <Label>
                    Nome do usuário
                </Label>
                <Input disabled type='text' name='nome' placeholder='Roberto Moretti' />
            </div>
            <div>
                <Label>
                    Email:
                </Label>
                <Input disabled type='text' name='email' placeholder='moberto@gmail.com' />
                <Switch />
                    Verificar Email
            </div>
            <div>
                <Label>
                    Id google:
                </Label>
                <Input disabled type='text' name='id' placeholder='8uy7hgtfvcbnjnhj8u76' />
            </div>
            <div>
                <Label>
                    Data de criação da conta:
                </Label>
                <Input disabled name='data' placeholder='01/09/1980' />
            </div>
            {/* <label htmlFor='nome'>Nome de usuário:</label>
            <input className='box' type="text" name='nome' id='nome' placeholder='Usuário'></input>
            <label htmlFor="email">Email:</label>
            <input className='box' type="email" name="email" id="email" placeholder='Email'></input>
            <label htmlFor='id'>Id google:</label>
            <input className='box' type='text' name='id' id='id' placeholder='id'></input> */}
        </form>
    </div>
}

