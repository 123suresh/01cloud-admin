import React from 'react';
import { Paper, Link } from '@material-ui/core';
import './SubscriptionCard.css';
import { spaceConversion , coreConversion } from '../../helpers/utils';

//const SubscriptionCard = ({disabled = false ,subscriptionName , subscriptionPrice , subscriptionCore , subscriptionApps ,subsciptionSpace , subscriptionDataTransfer , subscriptionRam}) => {
const SubscriptionCard = (props) => {	
 const { details } = props; 
 const disabled = !details.selected;
  return (
      <>
          <Paper elevation={3} className={ 'SubscriptionCard-container' } >
              <Link href="#" underline='none' onClick={ () => props.handleSubscriptionClick(details.id) }>
                  {/* <div className={ disabled === true ? 'SubscriptionCard-header-disabled' : 'SubscriptionCard-header' }>{details.name}</div>	 */}
                  <div className='SubscriptionCard-header'>{details.name}</div>
                  <div className={ disabled === true ? 'SubscriptionCard-pricing-disabled' : 'SubscriptionCard-pricing' }>
                      <div>
                        <span className={ disabled === true ? 'price-disabled' : 'price' }>${details.price}</span><span className={ disabled === true ? 'perMonth-disabled' : 'perMonth' }>/ month</span>
                      </div>
                  </div>
                  <div className={ disabled === true ? 'SubscriptionCard-content-disabled' : 'SubscriptionCard-content' }>
                      <div>
                        <p align='center' className={ disabled === true ? 'sc-contentText-disabled' : 'sc-contentText' }>{details.apps > 1 ? details.apps + ' Apps': details.apps + ' App'}</p>
                        <p align='center' className={ disabled === true ? 'sc-coreText-disabled' : 'sc-coreText' }>{coreConversion(details.cores)}</p>
                        <p align='center' className={ disabled === true ? 'sc-contentText-disabled' : 'sc-contentText' }>{spaceConversion(details.memory)} RAM</p>
                        <p align='center' className={ disabled === true ? 'sc-contentText-disabled' : 'sc-contentText' }>{spaceConversion(details.disk_space)} Disk</p>
                        <p align='center' className={ disabled === true ? 'sc-contentText-disabled' : 'sc-contentText' }>{spaceConversion(details.data_transfer)} Data Transfer</p>
                      </div>
                  </div>
              </Link>
          </Paper>
      </>
    )
};

export default SubscriptionCard;
