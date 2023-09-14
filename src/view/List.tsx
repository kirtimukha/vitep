import { useQuery } from 'react-query';
import {getList} from '../atom/api';
import {IListProps, IResult} from '../type/allTypes';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const RowStyle = styled.div`
  max-width: 1400px;
  width: 100%;
  margin:0 auto;
  display:flex;
  align-items: center;
  justify-content: center;

`

const UlStyle = styled.ul`
  display:flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 1rem; 
  width:100%;
  li{
    display:grid;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-width:11rem;
    padding: 1.25rem;
    border-radius: 0.625rem;
    background: rgba(255,255,255, 0.15);
    img{height: 8rem;}
    dl dt{text-transform: capitalize;margin-bottom:0.5rem;}
    dl dd{margin-bottom:0.65rem;}
    .numbering{
      display: inline-flex;
      justify-self: flex-start;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      line-height: 100%;
      padding: 0.5rem 0.75rem;
      border-radius: 0.25rem;
      background: royalblue;
      
    }
  }
`
const List = () => {
  const { data: listDB, isLoading, isError } = useQuery<IListProps>(
    "getLists",
      getList
  );
  


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
    <RowStyle className="row" id={`List`}>
      <UlStyle className={'list-ul'}>
        {!isLoading ? (
            listDB?.results?.map((item: IResult, index: number) => (
              <li key={`list_${index}`}>
                <span className="numbering">{ item.url.split('/')[6] }</span>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split ( '/' )[6] }.png`} alt={item.name}/>
                <dl>
                  <dt>{ item.name }</dt>
                  <dd>
                    속성으로 대체</dd>

                </dl>
                <button onClick={(e) => GoDetail(e, item.url.split('/')[6] ) }>Detail</button>
              </li>
            )))
        : <li>Loading...</li> }
      </UlStyle>
    </RowStyle>
  );
};

export default List;