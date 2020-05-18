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
    
    override func viewDidLoad() {
        super.viewDidLoad()
        NotificationCenter.default.addObserver(self, selector: #selector(toggleQRView(_:)), name: Notification.Name("ToggleQRView"), object: nil)
    }
    
    @objc func toggleQRView(_ noti: Notification) {
        
        guard let test: String = noti.userInfo?["direction"] as? String else { return }
        
        print(test)
        if test == "up" {
            qrCodeTopConstraint.constant = 100
        } else {
            qrCodeTopConstraint.constant = 338
        }

        UIView.animate(withDuration: 0.3) {
            self.view.layoutIfNeeded()
        }
    }
    
    
}
