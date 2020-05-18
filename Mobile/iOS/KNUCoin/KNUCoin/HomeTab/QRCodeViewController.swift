//
//  QRCodeViewController.swift
//  KNUCoin
//
//  Created by Sanghyun Byun on 2020/05/18.
//  Copyright © 2020 sbyun. All rights reserved.
//

import UIKit

class QRCodeViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let upSwipeGestureRecognizer = UISwipeGestureRecognizer(target: self, action: #selector(handlerSwipes(_:)))
        let downSwipeGestureRecognizer = UISwipeGestureRecognizer(target: self, action: #selector(handlerSwipes(_:)))
        
        upSwipeGestureRecognizer.direction = .up
        downSwipeGestureRecognizer.direction = .down
               
        view.addGestureRecognizer(upSwipeGestureRecognizer)
        view.addGestureRecognizer(downSwipeGestureRecognizer)
    }
    
    @objc func handlerSwipes(_ sender: UISwipeGestureRecognizer) {
        
        let userInfo: [AnyHashable: Any]
        
        if sender.direction == .up {
            userInfo = ["direction": "up"]
        } else {
            userInfo = ["direction": "down"]
        }
            
        NotificationCenter.default.post(name: Notification.Name("ToggleQRView"), object: nil, userInfo: userInfo)
    }
}
