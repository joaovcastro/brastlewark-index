import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  CardMedia,
  Typography,
  CardContent,
  Divider,
} from '@material-ui/core';
import { array } from 'prop-types';

const FriendList = ({ list }) => (
  <CardContent>
    <Grid container spacing={8} justify="space-between">
      <Grid item xs={12} style={{ marginBottom: '15px' }}>
        <div style={{ Width: '100%' }}>
          <Typography gutterBottom variant="h5" style={{ color: ' #3a5637' }}>
            Friends
          </Typography>
        </div>
        <Divider />
      </Grid>
      {list.map(
        friend =>
          friend && (
            <Grid item key={friend.name} sm={3} style={{ textAlign: 'center' }}>
              <Link
                key={friend.id}
                to={{
                  pathname: `/gnomes/${friend.id}`,
                }}
                onClick={() => window.location.refresh()}
              >
                <CardMedia
                  image={friend.thumbnail}
                  title="Avatar"
                  style={{
                    height: '150px',
                    width: '150px',
                    borderRadius: '100%',
                    marginLeft: 'calc(50% - 75px)',
                  }}
                />
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ paddingTop: '10px' }}
                >
                  {friend.name}
                </Typography>
              </Link>
            </Grid>
          ),
      )}
    </Grid>
  </CardContent>
);

FriendList.propTypes = {
  list: array.isRequired,
};

export default FriendList;
