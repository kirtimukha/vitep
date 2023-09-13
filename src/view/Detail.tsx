import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { IDetail } from '../type/allTypes';
import { getDetail } from '../atom/api';

const Detail = () => {
  const { id } = useParams();
  const num = id!.split(':')[0];
  const { data: detailDB, isLoading } = useQuery<IDetail>(
    "getDetail",
    () => getDetail(num)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {detailDB?.name && (
        <div key={`${detailDB?.name}`}>
          <span>Monster</span>
          <br />
          {detailDB?.name}
        </div>
      )}
      {detailDB?.types && (
        <div key={`${detailDB?.types}`}>
          <span>Types</span>
          <br />
          {detailDB?.types.map((item, idx) => (
            <span key={`type_${idx}`} className={`type`}>
             {idx + 1} {item.type.name}
            </span>
          ))}
        </div>
      )}
      {detailDB?.height && (
        <div key={`${detailDB?.height}`}>
          <span>Height</span>
          <br />
          {detailDB?.height}
        </div>
      )}
      {detailDB?.weight && (
        <div key={`${detailDB?.weight}`}>
          <span>Weight</span>
          <br />
          {detailDB?.weight}
        </div>
      )}
      {detailDB?.abilities && detailDB.abilities.length > 0 && (
        <div>
          <span>Abilities</span>
          <br />
          {detailDB.abilities.map((item, idx) => (
            <div key={`${idx}_${item.ability}`}>
              {item.ability.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Detail;
