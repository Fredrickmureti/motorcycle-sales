// Card.js or Component.js
import React from 'react';
import styled from 'styled-components';
import { Card, Button, Badge, Image } from 'antd';
import { ArrowRightOutlined, InfoCircleOutlined, DashboardOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const StyledCard = styled(Card)`
  max-width: 800px;
  margin: auto;
  overflow: hidden;
  cursor: pointer;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  height: 300px;
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
`;

export default function Component({ 
  motorcycle, 
  onDetailClick, 
  onEditClick, 
  onDeleteClick, 
  isAdmin 
}) {
  return (
    <StyledCard onClick={onDetailClick}>
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
          <p>
            <DashboardOutlined style={{ marginRight: 8 }} />
            Engine: {motorcycle.engine}
          </p>
          <p>
            {motorcycle.longDescription || 'The XR-750 combines cutting-edge technology with sleek design, offering unparalleled performance for both track and street riding.'}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Price>${motorcycle.price}</Price>
          <Button type="primary" icon={<ArrowRightOutlined />} size="large">
            Compare
          </Button>
        </div>
        <Button type="default" block icon={<InfoCircleOutlined />} size="large">
          View Details
        </Button>
        {isAdmin && (
          <div className="admin-buttons">
            <Link to={`/edit-motorcycle/${motorcycle._id}`} onClick={(e) => e.stopPropagation()}>
              <button className="edit-button" onClick={onEditClick}>Edit</button>
            </Link>
            <button className="delete-button" onClick={(e) => { e.stopPropagation(); onDeleteClick(motorcycle._id); }}>Delete</button>
          </div>
        )}
      </CardFooter>
    </StyledCard>
  );
}