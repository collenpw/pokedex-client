import { useState, useEffect } from "react";

import { Card, ListGroupItem } from "react-bootstrap";

import { useHistory } from "react-router";

const Abilities = () => {

    const history = useHistory();
    const [abilityData, setAbilityData] = useState(null);

    const getAbilityData = async() => {
        try{
            const res = await fetch ('https://pokeapi.co/api/v2/ability/?limit=327')
            const data = await res.json();
            setAbilityData(data.results)
        }
        catch(err){
            console.log(err);
        }
    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    useEffect(()=> {
        getAbilityData()
    }, [])



    console.log(abilityData);


    if(!abilityData) return <h1>Loading...</h1>

    abilityData.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })

    return (
        <div>
            <Card bg='dark'className='ability-descriptor'style={{ width: '24rem' }}>
                <Card.Text>All of the abilities in the games (click for details):</Card.Text>
            </Card>
            <div className='all-abilities'>
                {abilityData.map((ability) => {
                    return(
                        <Card onClick={() => {history.push(`/abilities/${ability.name}`)}} border='dark' className='single-ability'>
                            <Card.Title>{capitalize(ability.name)}</Card.Title>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
};

export default Abilities;