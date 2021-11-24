import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import './about.css';
import MemberBrief from "../../components/MemberBrief";
import avatar from '../../public/images/avatar.jpg'
import { MemberDetails } from "../../components/memberDetails";
import axios, { Routes } from '../../services/axios';

export default function About() {

    let [members, setMembers] = useState([]);
    let [member, setMember] = useState({});
    let [selected, setSelected] = useState(false);
    let [loading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true);
        const { url, method } = Routes.api.about();
        const { data } = await axios[method](url);
        setLoading(false);
        setMembers(data);
    }, [])

    function memberClicked(member) {
        setMember(member);
        setSelected(true);
    }

    return (
        <div className="about-wrapper">
            <h1>About Us</h1>
            <div className="about-info">
                <Typography paragraph>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Typography>
                <Typography paragraph>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Typography>
            </div>
            <br></br>

            { loading ? <div>Loading...</div> : !selected ? 
                <div className="team-container">
                    {members.map(member => 
                         <MemberBrief onClick={memberClicked} member={member} image={member.image}></MemberBrief>
                    )}
                </div> :
                 <MemberDetails member={member} onClick={() => { setSelected(false) }}></MemberDetails>
                }


        </div>
    )
}