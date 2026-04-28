import os
import urllib.request

urls = {
    'shapes_g1.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Shapes-basic.svg/512px-Shapes-basic.svg.png',
    'apples_100.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/100_Apples_%284564882193%29.jpg/512px-100_Apples_%284564882193%29.jpg',
    'addition.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Addition.svg/512px-Addition.svg.png',
    'compare.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Greater_than_less_than_equals_signs.png/512px-Greater_than_less_than_equals_signs.png',
    'column_addition.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Column_addition.svg/512px-Column_addition.svg.png',
    'clock.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Clock.svg/512px-Clock.svg.png',
    'wooden_ruler.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wooden_ruler.jpg/512px-Wooden_ruler.jpg',
    'girl_thinking.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Girl_thinking_clip_art.svg/512px-Girl_thinking_clip_art.svg.png',
    'multiplication.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Multiplication_sign.svg/512px-Multiplication_sign.svg.png',
    'division.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Division_sign.svg/512px-Division_sign.svg.png',
    'triangle.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Triangle.svg/512px-Triangle.svg.png',
    'fibonacci.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Fibonacci_spiral_34.svg/512px-Fibonacci_spiral_34.svg.png',
    'fraction_1_4.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fraction_1_4.svg/512px-Fraction_1_4.svg.png',
    'square.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Square.svg/512px-Square.svg.png',
    'dice_10_20.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/White_10_and_20_sided_dice.jpg/512px-White_10_and_20_sided_dice.jpg',
    'weight.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Weight.jpg/512px-Weight.jpg',
    'number_line.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Number_line_with_decimals.png/512px-Number_line_with_decimals.png',
    'percent.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Percent_18e.svg/512px-Percent_18e.svg.png',
    'ratio.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Ratio_in_fraction_%281%29.jpg/512px-Ratio_in_fraction_%281%29.jpg',
    'bar_chart.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bar_chart_example.svg/512px-Bar_chart_example.svg.png',
    'letters_vn.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Letters.svg/512px-Letters.svg.png',
    'musical_notes.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Musical_notes.svg/512px-Musical_notes.svg.png',
    'open_book.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Open_book_icon.svg/512px-Open_book_icon.svg.png',
    'books_hd.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Books_HD_%288314929977%29.jpg/512px-Books_HD_%288314929977%29.jpg',
    'pencil_icon.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Pencil-icon.svg/512px-Pencil-icon.svg.png'
}

output_dir = 'public/images/core'
os.makedirs(output_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0'}

for filename, url in urls.items():
    filepath = os.path.join(output_dir, filename)
    if not os.path.exists(filepath):
        req = urllib.request.Request(url, headers=headers)
        try:
            with urllib.request.urlopen(req) as response:
                if response.getcode() == 200:
                    with open(filepath, 'wb') as f:
                        f.write(response.read())
                    print(f"Saved {filepath}")
        except Exception as e:
            print(f"Error {filename}: {e}")
    else:
        print(f"Skipped {filename} - already exists")
print("Done.")
