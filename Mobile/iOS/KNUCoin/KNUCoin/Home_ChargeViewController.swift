//
//  Home_ChargeViewController.swift
//  KNUCoin
//
//  Created by Sanghyun Byun on 2020/05/16.
//  Copyright © 2020 sbyun. All rights reserved.
//

import UIKit

class Home_ChargeViewController: UIViewController {
    
    @IBOutlet weak var lbl: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
            
        self.lbl.text = "18000원"
    }
    
    @IBAction func btn(_ sender: Any) {
        print("asd")
    }
}
