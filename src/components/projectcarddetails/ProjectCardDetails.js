import React from 'react';
import { Paper } from '@material-ui/core';
import './ProjectCardDetails.css';
//import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Link } from 'react-router-dom';

const ProjectCardDetails = ({ appData }) => {
    console.log(appData)
  return (
      <Paper elevation={ 2 } >
          {/* <Link href={ `/app/${ appData.ID }` } underline='none'> */}
          <Link to={ {
                                      pathname: '/app/' +  appData.id,
                                      state: { appData }
                                    } } style={{textDecoration:'none'}}
          >
              <div className='projectListsContainer'>
                  <div className='projectTitleShorter'>
                      <p className='projectSmallTitle'>{ appData.name !== '' && appData.name.charAt(0).toUpperCase() }</p>
                  </div>
                  <div className='projectTitlesContainer'>
                      <span className='projectTitle'>{ appData.name }</span>
                      <span className='apps'>{appData.plugin && appData.plugin.name}</span>
                  </div>
                  {/* <MoreHorizIcon /> */}
              </div>
          </Link>
      </Paper>
  )
}

export default ProjectCardDetails