//
//  HomeViewController.swift
//  KNUCoin
//
//  Created by Sanghyun Byun on 2020/05/16.
//  Copyright © 2020 sbyun. All rights reserved.
//

import UIKit

class HomeViewController: UIViewController {
    
    @IBOutlet weak var qrCodeTopConstraint: NSLayoutConstraint!
    @IBOutlet weak var chargeViewConstraint: NSLayoutConstraint!
    
    
    var check = false
    
    override func viewDidLoad() {
        super.viewDidLoad()
        NotificationCenter.default.addObserver(self, selector: #selector(toggleQRView(_:)), name: Notification.Name("ToggleQRView"), object: nil)
        
        NotificationCenter.default.addObserver(self, selector: #selector(toggleChargeView), name: Notification.Name("ToggleChargeView"), object: nil)
    }
    
    @objc func toggleQRView(_ noti: Notification) {
        
        guard let direction: String = noti.userInfo?["direction"] as? String else { return }
        
        if direction == "up" {
            qrCodeTopConstraint.constant = 100
        } else {
            qrCodeTopConstraint.constant = 338
        }

        UIView.animate(withDuration: 0.3) {
            self.view.layoutIfNeeded()
        }
    }
    
    @objc func toggleChargeView(){
        
        if check {
            check = false
            chargeViewConstraint.constant = 627
        } else {
            check = true
            chargeViewConstraint.constant = 8
        }
        
        UIView.animate(withDuration: 0.5) {
            self.view.layoutIfNeeded()
        }
    }
    
    
}
