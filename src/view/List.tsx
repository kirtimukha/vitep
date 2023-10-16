import { useQuery } from 'react-query';
import {getDetail, getList} from '../api/api';
import { IListProps, IResult } from '../type/allTypes';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";
import Header from './component/Header';

const WrapperStyle = styled.div`
  position:relative;
  width: 100%;
  min-height:100vh; 
`
const RowStyle = styled.div`
  max-width: 1400px;
  width: 100%;
  margin:3rem auto;
  display:flex;
  align-items: center;
  justify-content: center;

`

const UlStyle = styled.ul`
  display:flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem; 
  width:100%;
  li{
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    width:calc(20% - 0.8rem);
    padding: 1.25rem;
    border-radius: 0.625rem;
    background: rgba(255,255,255, 0.15);
    img{height: 8rem;}
    dl{width: 100%;}
    dl dt{text-transform: capitalize;margin-bottom:0.5rem;}
    dl dd{margin-bottom:0.65rem;
      span.att,
      span.att + span.att{display: inline-block; padding: 0.0125rem 0.45rem; border-radius: 0.45rem; margin-left: 0.5rem; text-transform: capitalize;
        background: cadetblue;
      }
      .att:first-child{margin-left: 0;}
    }
  }
    .numbering{
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 1.25rem;
      line-height: 100%;
      padding: 0.5rem 0.75rem;
      border-radius: 0.25rem;
      background: royalblue;
    }
  
`
const List = () => {

  const { data: listDB, isLoading, isError } = useQuery<IListProps>(
    "getLists",
    getList
  );


  const [typesData, setTypesData] = useState<JSX.Element[] | null[]>([]);
  const [ search, setSearch ] = useState("");
  useEffect(() => {
    const fetchTypesData = async () => {
      const typesDataArray: JSX.Element[] = [];

      if(listDB && listDB?.results){
        for (let index = 1; index < listDB.results.length; index++) {
          const result = await getDetail(index.toString());
          const types = result.types;
          const typesElements = types.map((type, idx) => (
             <span className="att"  key={`type_${idx}`}>{type.type.name}</span>
        ));

        typesDataArray.push(
          <dd key={`dd_${index}`}>
            {typesElements}
          </dd>
        );
      }
      
      setTypesData(typesDataArray);
      console.log(typesData);
      }
    };
    
    fetchTypesData();
  }, [isLoading]);
  
const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  if (!listDB) {
    return <div>Data is not available</div>;
  }

  const GoDetail = (event: React.MouseEvent<HTMLButtonElement>, charNum: string) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/detail/${parseInt(charNum)}`);
  };
  
  return (
    <WrapperStyle id="wrapper">
      <Header />
      <RowStyle className="row" id={`searchBar`}>
          <label htmlFor="searchMonster">
            <input type="text" id={`searchMonster`}
                   onChange={(e) => setSearch(e.target.value)}
                   placeholder="Search..."
            />
          </label>
      </RowStyle>
      <RowStyle className="row" id={`List`}>

        <UlStyle className={'list-ul'}>
          {!isLoading ? (
           listDB?.results?.filter((result: IResult) =>
            result.name.toString().includes(search.toLowerCase())).map((item, key) => (
              <li key={`list_search_${key}`}>
                    <span className="numbering">{ item.url.split('/')[6] }</span>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split ( '/' )[6] }.png`} alt={item.name}/>
                    <dl>
                      <dt>{ item.name }</dt>
                      {typesData[key]}
                    </dl>
                    <button onClick={(e) => GoDetail(e, item.url.split('/')[6] ) }>Detail</button>
                  </li>
            )))     : <li>Loading...</li> }

          {/*listDB?.results?.map((item: IResult, index: number) => (
                <li key={`list_${index}`}>
                  <span className="numbering">{ item.url.split('/')[6] }</span>
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split ( '/' )[6] }.png`} alt={item.name}/>
                  <dl>
                    <dt>{ item.name }</dt>
                    {typesData[index]}
                </dl>
                  <button onClick={(e) => GoDetail(e, item.url.split('/')[6] ) }>Detail</button>
                </li>
              )))*/}

        </UlStyle>
      </RowStyle>
    </WrapperStyle>
  );
};

export default List;