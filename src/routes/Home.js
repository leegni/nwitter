import Nweet from "components/Nweet";
import { dbService } from "fbase";
import { addDoc, collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";

function Home({userObj}){
    const[nweet, setNweet] = useState("");
    const[nweets, setNweets] = useState([]);
   
    // const getNweets = async () =>{
    //     const dbNweets = await getDocs(collection(dbService,"nweets"));
    //     dbNweets.forEach(document => {
    //         const nweetObject = {
    //             ...document.data(),
    //             id: document.id,
    //         }
    //         setNweets(prev => [nweetObject, ...prev]);
    //     });
    // }

    useEffect(()=>{
        //getNweets();
        
        const q = query(
            collection(dbService,"nweets"),orderBy("createdAt","desc")
        );

        onSnapshot(q, snapshot=>{
            const nweetArr = snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
    },[]);

    const onSubmit = async (event) =>{
        event.preventDefault();

        try{
            await addDoc(collection(dbService, "nweets"), {
                text:nweet,
                createdAt:Date.now(),
                creatorId:userObj.uid,
            })
        }catch(e){
            console.error(e);
        }

        setNweet("");
    };
    const onChange = (event) =>{
        const{target:{value}}=event;
        setNweet(value);
    }
    return(
    <div>
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
            <input type="submit" value="Nweet"/>
        </form>
        <div>
            {nweets.map(nweet => 
               <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
            )}
        </div>
    </div>
    );
}
export default Home;