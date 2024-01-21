
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { server } from '../index';
import { Container, HStack,Button, RadioGroup, Radio } from '@chakra-ui/react'
import Loader from './Loader';
import Errcom from './ErrorComponent';
import Coincards from './Coincards';

const Coins = () => {


    const [Coins, setCoins] = useState([]);
    const [loading, setloading] = useState(true);
    const [errr, seterrr] = useState(false);
    const [page, setpage] = useState(1);
    const [currency, setcurrency] = useState("inr");
    


    const btn = new Array(132).fill(1);

    const changepage = (i) => {
        if(i===page){  // this is to prevent page to load or call api when it is on same page.
            return;
        }
        setpage(i);
        setloading(true);
    }

    const currencysymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    useEffect(() => {
        const fetchcoin = async () => {
            try {

                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
                // console.log(data);
                setCoins(data);
                setloading(false);

            } catch (error) {
                setloading(false);
                seterrr(true);
            }
        }
        fetchcoin();


    }, [currency, page])

    if (errr) return (<Errcom />)
    return (
        <Container maxW={"container.xl"}>{loading ? (<Loader />) : (
            <>

                <RadioGroup value={currency} onChange={setcurrency}>
                    <HStack spacing={'4'} p={'8'}>
                        <Radio value='inr'>INR</Radio>
                        <Radio value='usd'>USD</Radio>
                        <Radio value='eur'>EUR</Radio>
                    </HStack>
                </RadioGroup>

                <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
                    {Coins.map((item) => (
                        <Coincards
                            id={item.id}
                            key={item.id}
                            name={item.name}
                            img={item.image}
                            price={item.current_price}
                            symbol={item.symbol}
                            currencysymbol={currencysymbol}
                            url={item.url} />
                    ))}

                </HStack>
                <HStack w={'full'} overflowX={'auto'} p={'8'}>
                    {
                        btn.map((item, index) => (
                            <Button key={index} color="white" bgColor={"blackAlpha.900"} onClick={() => changepage(index + 1)}>
                                {index + 1}
                            </Button>
                        ))
                    }
                </HStack>
            </>
        )
        }
        </Container>


    )
}



export default Coins