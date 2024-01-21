
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { server } from '../index';
import { Container, HStack } from '@chakra-ui/react'
import Loader from './Loader';
import Errcom from './ErrorComponent';
import Exchangecards from './Exchangecards';

function Exchange() {


    const [exchanges, setexchange] = useState([]);
    const [loading, setloading] = useState(true);
    const [errr, seterrr] = useState(false);

    useEffect(() => {
        const fetchfun = async () => {
            try {

                const { data } = await axios.get(`${server}/exchanges`)
                // console.log(data);
                setexchange(data);
                setloading(false);

            } catch (error) {
                setloading(false);
                seterrr(true);
            }
        }
        fetchfun();


    }, [])

    if (errr) return (<Errcom />)
    return (
        <Container maxW={"container.xl"}>{loading ? (<Loader />) : (
            <>
                <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
                    {exchanges.map((item) => (
                        <Exchangecards
                            key={item.id}
                            name={item.name}
                            img={item.image}
                            rank={item.trust_score_rank}
                            url={item.url} />
                    ))}

                </HStack>
            </>
        )
        }
        </Container>

    )
}



export default Exchange