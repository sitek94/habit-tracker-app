import PropTypes from 'prop-types';

import { Table, TableBody, TableContainer } from '@material-ui/core';

import DashboardItem from '../dashboard-item';

function DashboardList({ list }) {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {list.map(({ id, name }) => (
            <DashboardItem 
              key={id} 
              habitId={id} 
              habitName={name} 
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

DashboardList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired
}

export default DashboardList;
