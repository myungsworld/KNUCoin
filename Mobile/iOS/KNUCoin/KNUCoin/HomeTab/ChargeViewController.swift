//
//  ChargeViewController.swift
//  KNUCoin
//
//  Created by Sanghyun Byun on 2020/05/19.
//  Copyright © 2020 sbyun. All rights reserved.
//

import UIKit

class ChargeViewController: UIViewController {
    
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
            
        NotificationCenter.default.post(name: Notification.Name("ToggleChargeView"), object: nil)
    }
}
