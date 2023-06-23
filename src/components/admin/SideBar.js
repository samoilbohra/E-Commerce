import React from 'react'
import Logo from '../../images/logo.png'
import { Link } from 'react-router-dom'
import { TreeItem, TreeView } from '@material-ui/lab'
import { Add, Dashboard, ExpandMore, ImageOutlined, ImportExport, ListAlt, People, PeopleAlt, PostAdd, RateReview ,Category } from '@material-ui/icons'
import './SideBar.css'

const SideBar = () => {


  return (
    <div className='sideBar'>
      <Link to='/'>
        <img src={Logo} alt='Ecommerce' />
      </Link>

      <Link to='/admin/dashboard'>
        <p> <Dashboard />DashBoard</p>
      </Link>
<Link to="#">
        <TreeView
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ImportExport />}
        >
          <TreeItem nodeId='1' label="Products">
            <Link to='/admin/products'>
              <TreeItem nodeId='2' label="All" icon={<PostAdd />} />
            </Link>
            <Link to='/admin/product'>
              <TreeItem nodeId='3' label="Create" icon={<Add />} />
            </Link>
          </TreeItem>

        </TreeView>
</Link>
        <Link to="/admin/orders">
        <p>
          <ListAlt/>
          Orders
        </p>
        </Link>

        <Link to="/admin/users">
        <p>
          <People/>
          Users
        </p>
        </Link>

        <Link to="/admin/reviews">
        <p>
          <RateReview/>
          Reviews
        </p>
        </Link>

        <Link to="/admin/categories">
        <p>
          <Category/>
          Category
        </p>
        </Link>

    </div>
  )
}

export default SideBar
