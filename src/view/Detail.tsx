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
const EachPartStyle = styled.div`
  width:100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .attr{  font-size: 1rem;}
`
const TitleStyle = styled.span`
  font-size: 1rem;
  margin-right: 0.5rem;
`
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
      {detailDB?.name && (
        <EachPartStyle className={`eachPart`} key={`${detailDB?.name}`}>
          <TitleStyle className={`title`}>Monster</TitleStyle>
          <br />
          <span className="att">{detailDB?.name}</span>
        </EachPartStyle>
      )}
      {detailDB?.types && (
        <EachPartStyle className={`eachPart`} key={`${detailDB?.types}`}>
          <TitleStyle className={`title`}>Types</TitleStyle>
          <br />
          {detailDB?.types.map((item, idx) => (
            <span key={`type_${idx}`} className={`att type`}>
             {idx + 1} {item.type.name}
            </span>
          ))}
        </EachPartStyle>
      )}
      {detailDB?.height && (
        <EachPartStyle className={`eachPart`} key={`${detailDB?.height}`}>
          <TitleStyle className={`title`}>Height</TitleStyle>
          <br />
          <span className="att">{detailDB?.height}</span>
        </EachPartStyle>
      )}
      {detailDB?.weight && (
        <EachPartStyle className={`eachPart`} key={`${detailDB?.weight}`}>
          <TitleStyle className={`title`}>Weight</TitleStyle>
          <br />
          <span className="att">{detailDB?.weight}</span>
        </EachPartStyle>
      )}
      {detailDB?.abilities && detailDB.abilities.length > 0 && (
        <EachPartStyle className={`eachPart`}>
          <TitleStyle className={`title`}>Abilities</TitleStyle>
          <br />
          {detailDB.abilities.map((item, idx) => (
            <span key={`${idx}_${item.ability}`} className={`attr`}>
              {item.ability.name}
            </span>
          ))}
        </EachPartStyle>
      )}
    </RowStyle>
  );
};

export default Detail;
