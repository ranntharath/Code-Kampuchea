<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $fillable = ['title','description','thumbnail','price','discount_percent','category_id','is_free',"instructor", 'level'];
        // many-to-one
    public function category(){
        return $this->belongsTo(Category::class);
    }
    
    public function lessons(){
        return $this->hasMany(Lesson::class)->orderBy('order', 'asc');
    }
    public function orders(){
        return $this->hasMany(Order::class);
    }
}
