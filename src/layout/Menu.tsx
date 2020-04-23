import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery, Theme } from '@material-ui/core';
import { MenuItemLink, getResources } from 'react-admin';
import { withRouter } from 'react-router-dom';
import InsertChartIcon from '@material-ui/icons/InsertChart';

const Menu:React.FC<any> = (props:any) => {
	const { onMenuClick, logout } = props;
    const isXSmall = useMediaQuery((theme:Theme) => theme.breakpoints.down('xs'));
    const open = useSelector((state:any) => state.admin.ui.sidebarOpen); //i dont have their type at hand
	const resources:any = useSelector(getResources);
    return (
        <div>
            {resources.filter((r:any)=>r.hasList).map((resource:any) => (
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={resource.options && resource.options.label || resource.name}
                    leftIcon={resource.icon&&React.createElement(resource.icon)}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                />
            ))}
            <MenuItemLink
                to="/charts"
                primaryText="Charts"
                leftIcon={<InsertChartIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            />
        </div>
    );
}
export default Menu;
/* export default withRouter(Menu); */