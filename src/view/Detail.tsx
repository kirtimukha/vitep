import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { IDetail } from '../type/allTypes';
import { getDetail } from '../atom/api';
import styled from "styled-components";
const RowStyle = styled.div`
  max-width: 1400px;
  width: 100%;
  margin:0 auto;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`
const TblDetail = styled.table`
  width: 100%;
  min-width: 400px;
  max-width: 600px;
  text-align: center;
  border: 1px solid rgba(0,0,0,0.65);
  border-collapse: collapse;
  border-spacing: unset;
  th{text-align: left; padding: 0.55rem 1rem;border: 1px solid rgba(0,0,0,0.65); background: rgba(0,0,0,0.45)}
  td{text-align: left; padding: 0.55rem 1rem;border: 1px solid rgba(0,0,0,0.65);text-transform: capitalize;}
`
const ImgStyle = styled.img`
  height: 10rem;
`
const EachPartStyle = styled.div`
  width:100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .attr{  font-size: 1rem;}
`
/*const TitleStyle = styled.span`
  font-size: 1rem;
  margin-right: 0.5rem;
`*/
const Detail = () => {
  const { id } = useParams();
  const num = id!.split(':')[0];
  
  const { data: detailDB, isLoading } = useQuery<IDetail>(
    "getDetail",
    () => getDetail(num), {enabled: !!num}
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <RowStyle>
  
      {detailDB?.sprites.front_default && (
        <EachPartStyle className={`eachPart`} key={`Image_${detailDB?.name}`}>
          {/* <TitleStyle className={`title`}>Sprites</TitleStyle>
          <br />*/}
          <ImgStyle src={detailDB?.sprites.front_default} alt={`Image_${detailDB?.name}`}/>
        </EachPartStyle>
      )}
      <TblDetail id={`tblDetail`}>
        <colgroup>
          <col width="120px" />
          <col width="*" />
        </colgroup>
       <tbody>
       {detailDB?.name && (
          <tr key={`${detailDB?.name}`}>
            <th>Monster</th>
            <td><span className="att">{detailDB?.name}</span></td>
          </tr>
           )}

       {detailDB?.types && (
         <tr  key={`${detailDB?.types}`}>
           <th>Types</th>
           <td>
             {detailDB?.types.map((item, idx) => (
             <span className="att">{detailDB?.types.length === 1 ? "" : (idx + 1)} {item.type.name}</span>
             ))}
             </td>
         </tr>
       )}

       {detailDB?.height && (
         <tr key={`${detailDB?.height}`}>
           <th>Height</th>
           <td><span className="att">{detailDB?.height}</span></td>
         </tr>
       )}
       {detailDB?.weight && (
         <tr key={`${detailDB?.weight}`}>
           <th>Weight</th>
           <td><span className="att">{detailDB?.weight}</span></td>
         </tr>
       )}
       {detailDB?.abilities && detailDB.abilities.length > 0 && (
         <tr key={`${detailDB?.weight}`}>
           <th>Abilities</th>
           <td> {detailDB.abilities.map((item, idx) => (
             <span key={`${idx}_${item.ability}`} className={`attr`}>
              {item.ability.name}
            </span>
           ))}</td>
         </tr>
       )}
        </tbody>
      </TblDetail>
    
      
     
    
    </RowStyle>
  );
};

export default Detail;
