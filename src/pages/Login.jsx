import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const navigate = useNavigate()
    return(
<div>

</div>
    )
}