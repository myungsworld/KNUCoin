//
//  HomeViewController.swift
//  KNUCoin
//
//  Created by Sanghyun Byun on 2020/05/16.
//  Copyright © 2020 sbyun. All rights reserved.
//

import UIKit

class HomeViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "ToSecondChild" {
            let destVC = segue.destination as! Home_ChargeViewController
        }
    }
}
