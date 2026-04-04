import os
import glob
import re

html_files = glob.glob('*.html')

old_footer = '<div><div class="ft-col-title">Services</div><ul class="ft-links"><li><a href="services.html">YouTube Marketing</a></li><li><a href="services.html">Google & SEO</a></li><li><a href="services.html">Facebook Marketing</a></li><li><a href="services.html">Instagram Reels</a></li><li><a href="services.html">Meta Ads</a></li><li><a href="services.html">SEO</a></li></ul></div>'
new_footer = '<div><div class="ft-col-title">Services</div><ul class="ft-links"><li><a href="services.html#svc-youtube">YouTube Marketing</a></li><li><a href="services.html#svc-google">Google & SEO</a></li><li><a href="services.html#svc-facebook">Facebook Marketing</a></li><li><a href="services.html#svc-instagram">Instagram Reels</a></li><li><a href="services.html#svc-meta">Meta Ads</a></li><li><a href="services.html#svc-seo">SEO</a></li></ul></div>'

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Replace the footer in all files
    content = content.replace(old_footer, new_footer)

    # 2. Add ID tags to services.html cards
    if f.lower() == 'services.html':
        content = content.replace('<div class="svc-card reveal" onclick="window.location.href=\'contact.html\'"><div class="svc-num">01</div>', '<div id="svc-youtube" class="svc-card reveal" onclick="window.location.href=\'contact.html\'" style="scroll-margin-top: 120px;"><div class="svc-num">01</div>')
        content = content.replace('<div class="svc-card reveal d1" onclick="window.location.href=\'contact.html\'"><div class="svc-num">02</div>', '<div id="svc-google" class="svc-card reveal d1" onclick="window.location.href=\'contact.html\'" style="scroll-margin-top: 120px;"><div class="svc-num">02</div>')
        content = content.replace('<div class="svc-card reveal d2" onclick="window.location.href=\'contact.html\'"><div class="svc-num">03</div>', '<div id="svc-facebook" class="svc-card reveal d2" onclick="window.location.href=\'contact.html\'" style="scroll-margin-top: 120px;"><div class="svc-num">03</div>')
        content = content.replace('<div class="svc-card reveal" onclick="window.location.href=\'contact.html\'"><div class="svc-num">04</div>', '<div id="svc-instagram" class="svc-card reveal" onclick="window.location.href=\'contact.html\'" style="scroll-margin-top: 120px;"><div class="svc-num">04</div>')
        content = content.replace('<div class="svc-card reveal d1" onclick="window.location.href=\'contact.html\'"><div class="svc-num">05</div>', '<div id="svc-meta" class="svc-card reveal d1" onclick="window.location.href=\'contact.html\'" style="scroll-margin-top: 120px;"><div class="svc-num">05</div>')
        content = content.replace('<div class="svc-card reveal d2" onclick="window.location.href=\'contact.html\'"><div class="svc-num">06</div>', '<div id="svc-seo" class="svc-card reveal d2" onclick="window.location.href=\'contact.html\'" style="scroll-margin-top: 120px;"><div class="svc-num">06</div>')
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Updated footer navigation and added service card IDs.")
