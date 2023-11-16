import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";

import { 
    CheckIfWalletConnected, 
    connectWallet, 
    connectingWithContract 
} from '@/Utils/apiFeature';

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [error, setError] = useState("");

    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");

    const router = useRouter();
    
    //Fetch data for f
    const fetchData = async() => {
        try{
            //get contract
            const contract = await connectingWithContract();
            //get account
            const connectAccount = await connectWallet();
            setAccount(connectAccount);
            console.log("contract: ", contract)
            console.log("connectAccount: ", connectAccount)
            console.log("accountAddress: ", contract.address)
            //get username
            const userName = await contract.getUsername(connectAccount);
            setUserName(userName);
            //get friendList
            const friendLists = await contract.getMyFriendList();
            setFriendLists(friendLists);
            //get allappuser
            const userList = await contract.getAllAppUser()
            setUserLists(userList);
        } catch (error) {
            //setError('Install and connect your wallet');
            console.error("An error occured:", error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    const readMessage = async(friendAddress) => {
        try {
            const contract = await connectingWithContract();
            const read = await contract.readMessage(friendAddress);
            setFriendMsg(read);
        } catch(error){
            console.log("Currently you have no message")
        }
    }

    const createAccount = async({name, accountAddress})=>{
        try{
                const contract = await connectingWithContract();
                const getCreatedUser = await contract.createAccount(name);
                setLoading(true);
                await getCreatedUser.wait();
                setLoading(false);
                window.location.reload();
        } catch (error) {
            setError("Error while creating your account")
        }
    }

    const addFriends = async({name, accountAddress})=>{
        try{
            const contract = await connectingWithContract();
            const addMyFriend = await contract.addFriend(accountAddress, name);
            setLoading(true)
            await addMyFriend.wait()
            setLoading(false);
            router.push("/");
            window.location.reload();
        } catch(error){
            setError("Something went wrong while adding friends, try again")
        }
    }

    const sendMessage = async({msg, address})=>{
        try{
            const contract = await connectingWithContract();
            const addMessage = await contract.sendMessage(address, msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();
        } catch (error){
            setError("Please reload and try again");
        }
    };

    const readUser = async(userAddress)=>{
        const contract = await connectingWithContract();
        const userName = await contract.getUsername(userAddress);
        setCurrentUserName(userName);
        setCurrentUserAddress(userAddress);
    }
    return (
        <ChatAppContext.Provider 
        value = {{ 
            readMessage, 
            createAccount, 
            addFriends, 
            sendMessage, 
            readUser, 
            connectWallet,
            CheckIfWalletConnected,
            account, 
            userName, 
            friendLists, 
            friendMsg, 
            loading, 
            userLists, 
            error, 
            currentUserName, 
            currentUserAddress,
            }}
        >
            {children}
        </ChatAppContext.Provider>
    )
}