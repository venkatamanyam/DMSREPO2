import { Route, Routes } from "react-router-dom";
import LoginUser from "../Login/LoginUser";
import DocMeta from "../DocMeta/DocMeta";
import AddEmployee from "../AddEmployee/AddEmployee";
import DocumentViewer from "../DocumentViewer/DocumentViewer";
import DepartmentDocument from "../DepartmentDocument/DepartmentDocument";
import DocTagsViewer from "../DocTagsViewer/DocTagsViewer";
import ForgetPassword from "../ForgetPassword/ForgetPassword";

export function RouterPage(){
    return(
        <switch>
            <Routes>
                <Route exact path="/" Component={LoginUser}/>
                <Route path="/docmeta" Component={DocMeta} />
                <Route path="/Add-Emp" Component={AddEmployee} />
                <Route path="/doc-viewer/:item" Component={DocumentViewer} />
                <Route path="/dept-doc/:dept" Component={DepartmentDocument} />
                <Route path="/doc-tag-viewer/:tag" Component={DocTagsViewer} />
                <Route path="/fgt-pwd" Component={ForgetPassword} />
            </Routes>
        </switch>
    )
}