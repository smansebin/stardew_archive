import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import menuFarm from '../assets/ui/menu-farm.svg'
import menuNpc from '../assets/ui/menu-npc.svg'
import menuFishing from '../assets/ui/menu-fishing.svg'
import menuForage from '../assets/ui/menu-forage.svg'
import menuMine from '../assets/ui/menu-mine.svg'
import logo  from '../assets/logo.png'
import './Navbar.css'

const MENUS = [
  { id: 'farm', label: '농장', svg: menuFarm, path: '/farm' },
  { id: 'npc', label: '이웃', svg: menuNpc, path: '/npc' },
  { id: 'fishing', label: '낚시', svg: menuFishing, path: '/fishing' },
  { id: 'forage', label: '채집', svg: menuForage, path: '/forage' },
  { id: 'mine', label: '광산', svg: menuMine, path: '/mine' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [hovered, setHovered] = useState(null)

  const isActive = (path) => location.pathname === path

  return (
    <header className="navbar">

      <div className="navbar__menus">
        {MENUS.map((menu) => {
          const active  = isActive(menu.path)
          const dropped = hovered === menu.id || active

          return (
            <button
              key={menu.id}
              className={`menu-btn ${dropped ? 'menu-btn--dropped' : ''}`}
              onMouseEnter={() => setHovered(menu.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(menu.path)}
              aria-label={menu.label}
            >
              <span className="menu-btn__label">{menu.label}</span>
              <img
                src={menu.svg}
                alt=""
                className="menu-btn__img"
                draggable={false}
              />
            </button>
          )
        })}
      </div>

      <div className="navbar__logo">
        <img src={logo} alt="Stardew Archive" onClick={() => navigate('/')} />
      </div>
    </header>
  )
}
