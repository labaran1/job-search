import React, { useContext } from 'react';
import { Context } from '../../../../context/index';
export default function Sidebar() {
  const appContext = useContext(Context);
  const { boards, user } = appContext.state;
  return (
    <nav>
      <div> User Info</div>
      <div>
        <ul>
          <li>Jobs</li>

          <li>
            Boards
            <ul>
              {boards.map((b) => (
                <li key={b.id}>{b.name}</li>
              ))}
            </ul>
          </li>
          <li>Metrics</li>
        </ul>
      </div>
    </nav>
  );
}
