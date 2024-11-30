// Card.js or Component.js
import React from 'react';
import styled from 'styled-components';
import { Card, Button, Badge, Image } from 'antd';
import { ArrowRightOutlined, InfoCircleOutlined, DashboardOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Card.css';

const { Meta } = Card;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 600px;
  margin: auto;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  height: 300px;
  width: 100%;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledBadge = styled(Badge)`
  position: absolute;
  top: 16px;
  left: 16px;
`;

const CardHeader = styled.div`
  padding: 16px;
`;

const CardContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const CardFooter = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Price = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #1890ff;
`;

const StyledButton = styled(Button)`
  &.ant-btn-primary {
    background: #1890ff;
    border-radius: 6px;
    
    &:hover {
      background: #40a9ff;
      transform: translateY(-2px);
    }
  }
`;

export default function Component({ 
  motorcycle, 
  onDetailClick, 
  onEditClick, 
  onDeleteClick, 
  isAdmin 
}) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(price);
  };

  return (
    <StyledCard onClick={onDetailClick} className='styled-card'>
      <div style={{ position: 'relative' }}>
        <StyledImage
          alt={motorcycle.model}
          src={motorcycle.images && motorcycle.images.length > 0 ? motorcycle.images[0] : "/placeholder.svg?height=400&width=600"}
          preview={false}
        />
        {motorcycle.newArrival && (
          <StyledBadge count="New Arrival" style={{ backgroundColor: '#52c41a' }} />
        )}
      </div>
      <CardHeader>
        <Meta
          title={`${motorcycle.brand} ${motorcycle.model}`}
          description={motorcycle.description || 'Experience the thrill of high-performance riding'}
        />
      </CardHeader>
      <CardContent>
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: '16px', color: '#666' }}>
            <DashboardOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            Engine: {motorcycle.engine}
          </p>
          <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
            {motorcycle.description || 'The XR-750 combines cutting-edge technology with sleek design, offering unparalleled performance for both track and street riding.'}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Price>{formatPrice(motorcycle.price)}</Price>
          <StyledButton type="primary" icon={<ArrowRightOutlined />} size="large">
            Compare
          </StyledButton>
        </div>
        <StyledButton type="default" block icon={<InfoCircleOutlined />} size="large">
          View Details
        </StyledButton>
        {isAdmin && (
          <div className="admin-buttons" style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <Link to={`/edit-motorcycle/${motorcycle._id}`} style={{ width: '50%' }} onClick={(e) => e.stopPropagation()}>
              <StyledButton className="edit-button" block onClick={onEditClick}>
                Edit
              </StyledButton>
            </Link>
            <StyledButton 
              className="delete-button" 
              danger 
              block
              style={{ width: '50%' }}
              onClick={(e) => { 
                e.stopPropagation(); 
                onDeleteClick(motorcycle._id); 
              }}
            >
              Delete
            </StyledButton>
          </div>
        )}
      </CardFooter>
    </StyledCard>
  );
}