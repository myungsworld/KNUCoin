//
//  SplashViewController.swift
//  KNUCoin
//
//  Created by Sanghyun Byun on 2020/05/27.
//  Copyright © 2020 sbyun. All rights reserved.
//

import UIKit

class SplashViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        guard let url = URL(string: "http://172.30.1.10:3000/api/user/autologin") else { return }
        
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        
        let task = URLSession.shared.dataTask(with: url) { (data, response, error) in
            
            if let e = error {
                NSLog("An error has ooccured : \(e.localizedDescription)")
                return
            }
            
            
            if let res = response as? HTTPURLResponse {
                
                DispatchQueue.main.async {
                    do {
                        if res.statusCode == 200 {
                            
                            let cookies = self.readCookie(forURL: url)
                            print(cookies)
                            
                            if let contoller = self.storyboard?.instantiateViewController(withIdentifier: "HomeView") {
                                self.navigationController?.pushViewController(contoller, animated: true)
                            }
                        } else {
                            
                            if let contoller = self.storyboard?.instantiateViewController(withIdentifier: "LoginView") {
                                self.navigationController?.pushViewController(contoller, animated: true)
                            }
                        }
                    }
                }
                
            }
        }
        
        task.resume()

    }
    
    func readCookie(forURL url: URL) -> [HTTPCookie] {
        let cookieStorage = HTTPCookieStorage.shared
        let cookies = cookieStorage.cookies(for: url) ?? []
        return cookies
    }
    
    func deleteCookies(forURL url: URL) {
        let cookieStorage = HTTPCookieStorage.shared
        
        for cookie in readCookie(forURL: url) {
            cookieStorage.deleteCookie(cookie)
        }
    }

}
