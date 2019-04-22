import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Divider,
} from '@material-ui/core/';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { shape, string, array } from 'prop-types';

const TitleWrapper = styled.div`
  height: 75px;
  text-align: center;
`;

const ContentWrapper = styled.div`
  height: 80px;
  line-height: 1.5em;
  padding-top: 15px;
  text-align: left;
`;

const CustomCard = styled(Card)`
  margin: 20px 0;
`;

const InfoCard = ({ info }) => (
  <Link to={{ pathname: `/gnomes/${info.id}` }}>
    <CustomCard>
      <CardActionArea>
        <CardMedia
          image={info.thumbnail}
          title="Avatar"
          style={{ height: '250px' }}
        />
        <CardContent>
          <TitleWrapper>
            <Typography gutterBottom variant="h5" component="h5">
              {info.name.split(' ')[0]}
            </Typography>
            <Typography gutterBottom variant="h5" component="h5">
              {info.name.split(' ')[1]}
            </Typography>
          </TitleWrapper>
          <Divider />
          <ContentWrapper>
            <Typography component="p">{info.professions.join(', ')}</Typography>
          </ContentWrapper>
        </CardContent>
      </CardActionArea>
    </CustomCard>
  </Link>
);

InfoCard.propTypes = {
  info: shape({
    thumbnail: string,
    name: string,
    professions: array,
  }),
};

export default InfoCard;
