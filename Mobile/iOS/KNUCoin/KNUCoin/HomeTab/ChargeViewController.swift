//
//  ChargeViewController.swift
//  KNUCoin
//
//  Created by Sanghyun Byun on 2020/05/20.
//  Copyright © 2020 sbyun. All rights reserved.
//

import UIKit

class ChargeViewController: UIViewController {
    
    @IBOutlet weak var chargeAmount_tf: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        self.chargeAmount_tf.becomeFirstResponder()
    }
    
    @IBAction func charge_btn(_ sender: Any) {
        
        if let money = chargeAmount_tf.text {
            
            let params = ["user_id" : "byun618",
                          "amount" : money ]
            
            guard let url = URL(string: "http://54.180.89./login") else { return }
            
            
        } else { return }
    }
    

}
