import React from 'react';

export default function HomePageModal(props) {

  const isModalOpen = props.isModalOpen;

  return (
    <div>
      <div className="modal dimmer" tabIndex="-1" role="dialog" style={isModalOpen ? { display: 'block' } : { display: 'none' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Wicked Hoodies (DEMO SITE)</h5>
            </div>
            <div className="modal-body">
              <p>This site is a demo, and no real purchases will be made. Do not enter personal information!</p>
            </div>
            <div className="modal-footer">
              <button onClick={() => props.handleModal()} type="button" className="btn btn-secondary" data-dismiss="modal" aria-label="Close">I understand!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
