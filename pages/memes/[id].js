import { useRouter } from "next/router";
import Image from "next/image";

export default function Mem({ mem }) {
    const { back } = useRouter();
    
    console.log('to jest mem',mem);
    return (
        <>

            <h1>Mem</h1>
            <img src={mem.url} alt={`Mem ${mem.name}`} />
            <button onClick={() => back()}>Wróć</button> 
                      
        </>
    );
}

export async function getServerSideProps(context) {
    const {id} = context.params;
    const response = await fetch('https://api.imgflip.com/get_memes');
    const { data, success } = await response.json();

    if (!success) {
        return {
            redirect: {
                destination: `/`,
                permament: false,
            }
        }
    }


const mem = data.memes.find(mem => mem.id === id);


return {
    props: {
        mem,
    }
}
}