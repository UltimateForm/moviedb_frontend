import React from "react";
import { Layout,AppBar } from "react-admin";
import Menu from "./Menu";

const CoolerAppbar:React.FC<any> = (props:any) => <AppBar {...props} userMenu={<div />} />;


const CoolerLayout: any = (props: any) => (
	<Layout
		{...props}
		appBar={CoolerAppbar}
		menu={Menu}
	/>
);

export default CoolerLayout;
