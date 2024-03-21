import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default async function Page(){
    return(
        <div className="w-1/2">
            <h1>Create your project</h1>
            <p>Write the title of the sections you want to add.</p>
            <div id="sections">

            </div>
            <div className="grid w-full gap-1.5">
                <Label>Press Enter or comma to add</Label>
                <Textarea placeholder="Type your section title here." id="message" />
            </div>
            <Button>Create</Button>
        </div>
    )
}