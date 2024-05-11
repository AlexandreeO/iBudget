import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as groupAPI from '../../utilities/groups-api'

export default function GroupDetailPage() {
    const { id } = useParams();
    const [group, setGroup] = useState(null);

    useEffect(function (){
        async function getGroup (){
            const groupData = await groupAPI.getGroup(id);
            setGroup(groupData);
        }
        getGroup();
    })






    return (
        <div>
            <h1>a group</h1>
        </div>
    );
}
