import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Badge, Button, Progress, Container, Image, Box, Radio, RadioGroup, HStack, VStack, Text, Stat, StatArrow, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react'
import { server } from '..';
import axios from 'axios';
import Errcom from './ErrorComponent';
import Loader from './Loader';
import Chart from './Chart';


function Coinsdetail() {

    const [Coins, setCoins] = useState({});
    const [loading, setloading] = useState(true);
    const [errr, seterrr] = useState(false);
    const [currency, setcurrency] = useState("inr");
    const [days, setdays] = useState("24h");
    const [chartArray, setchartArray] = useState([]);


    const currencysymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

    const switchChartStats = (key) => {
        if(key===days){
            return;
        }
        switch (key) {

            case "24h":
                setdays("24h");
                setloading(true);
                break;
            case "7d":
                setdays("7d");
                setloading(true);
                break;
            case "14d":
                setdays("14d");
                setloading(true);
                break;
            case "30d":
                setdays("30d");
                setloading(true);
                break;
            case "60d":
                setdays("60d");
                setloading(true);
                break;
            case "200d":
                setdays("200d");
                setloading(true);
                break;
            case "365d":
                setdays("365d");
                setloading(true);
                break;
            case "max":
                setdays("max");
                setloading(true);
                break;

            default:
                setdays("24h");
                setloading(true);
                break;
        }
    }



    const params = useParams();
    useEffect(() => {
        const fetchcoin = async () => {
            try {

                const { data } = await axios.get(`${server}/coins/${params.id}`)  //api calling
                const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
                // console.log(data);
                // console.log(chartData);
                setCoins(data);
                setchartArray(chartData.prices);
                setloading(false);

            } catch (error) {
                setloading(false);
                seterrr(true);
            }
        }
        fetchcoin();


    }, [params.id, currency, days])
    if (errr) return (<Errcom />)
    return (
        <Container maxW={"container.xl"}>
            {
                loading ? <Loader /> : (
                    <>
                        <Box w={'full'} borderWidth={1} p={'4'} >
                            <Chart arr={chartArray} currency={currencysymbol} days={days} />
                        </Box>

                        <HStack overflowX={"auto"} p={'4'}>
                            {
                                btns.map((i) => (
                                    <Button key={i} onClick={() => switchChartStats(i)}>
                                        {i}
                                    </Button>
                                ))

                            }
                        </HStack>


                        <RadioGroup value={currency} onChange={setcurrency}>
                            <HStack spacing={'4'} p={'8'}>
                                <Radio value='inr'>INR</Radio>
                                <Radio value='usd'>USD</Radio>
                                <Radio value='eur'>EUR</Radio>
                            </HStack>
                        </RadioGroup>
                        

                        <VStack spacing={4} p={16} alignItems={'flex-start'}>
                            <Text fontSize={'small'} alignSelf={'center'} opacity={0.7}>
                                Last updated on {Date(Coins.market_data.last_updated).split("G")[0]}
                            </Text>
                            <Image src={Coins.image.large}
                                w={16}
                                h={16}
                                objectFit={'contain'}

                            />
                            <Stat>
                                <StatLabel>{Coins.name}</StatLabel>
                                <StatNumber>{currencysymbol}{Coins.market_data.current_price[currency]}</StatNumber>

                                <StatHelpText>
                                    <StatArrow type={Coins.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"} />
                                    {Coins.market_data.price_change_percentage_24h}%
                                </StatHelpText>
                            </Stat>
                            <Badge
                                fontSize={'x-large'}
                                bgColor={'blackAlpha.800'}
                                color="white">
                                {`#${Coins.market_cap_rank}`}
                            </Badge>
                            <Custombar
                                high={`${currencysymbol}${Coins.market_data.high_24h[currency]}`}
                                low={`${currencysymbol}${Coins.market_data.low_24h[currency]}`}
                            />

                            <Box w={'full'} padding={'4'}>
                                <Item
                                    title={'Max supply'} value={Coins.market_data.max_supply}
                                />
                                <Item
                                    title={'Circulating supply'} value={Coins.market_data.circulating_supply}
                                />
                                <Item
                                    title={'Market Cap'} value={`${currencysymbol}${Coins.market_data.market_cap[currency]}`}
                                />
                                <Item
                                    title={'All Time Low'} value={`${currencysymbol}${Coins.market_data.atl[currency]}`}
                                />
                                <Item
                                    title={'All Time High'} value={`${currencysymbol}${Coins.market_data.ath[currency]}`}
                                />
                            </Box>




                        </VStack>
                    </>
                )
            }

        </Container>
    )
}
const Custombar = ({ high, low }) => (
    <VStack w={'full'}>
        <Progress value={50} w={'full'} colorScheme={'teal'} />
        <HStack w={'full'} justifyContent={"space-between"}>
            <Badge children={low} colorScheme='red'></Badge>
            <Badge children={high} colorScheme='green'></Badge>
        </HStack>
    </VStack>
)

const Item = ({ title, value }) => (
    <HStack my={4} w={'full'} justifyContent={"space-between"}>
        <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{title}</Text>
        <Text>{value}</Text>
    </HStack>
)

export default Coinsdetail
